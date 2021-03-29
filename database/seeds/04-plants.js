exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('plants')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('plants').insert([
        {
          plant_name: 'Fiddle Leaf Fig',
          species_name: 'Ficus Lyrata',
          water_id: 1,
          light_id: 2,
          plant_image:
            'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_fiddle-leaf-fig_charcoal-alt.jpg?ver=279576',
        },
        {
          plant_name: 'Golden Barrel Cactus',
          species_name: 'Echinocactus grusonii',
          water_id: 3,
          light_id: 5,
          plant_image:
            'https://bloomscape.com/wp-content/uploads/2021/03/bloomscape_cacti-golden-barrell_medium_clay.jpg?ver=425501',
        },
        {
          plant_name: 'Hedgehog Aloe',
          species_name: 'Aloe Vera',
          water_id: 3,
          light_id: 5,
          plant_image:
            'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_hedgehog-aloe_charcoal.jpg?ver=278997',
        },
        {
          plant_name: 'Kimberly Queen Fern',
          species_name: 'Nephrolepis obliterata',
          water_id: 2,
          light_id: 2,
          plant_image:
            'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_kimberly-queen-fern_charcoal.jpg?ver=279236',
        },
        {
          plant_name: 'Neon Rubber Tree',
          species_name: 'Ficus Altissima',
          water_id: 1,
          light_id: 2,
          plant_image:
            'https://bloomscape.com/wp-content/uploads/2020/05/bloomscape_ficus-altissima-std_charcoal.jpg?ver=385169',
        },
        {
          plant_name: 'Parlor Palm',
          species_name: 'Chamaedorea elegans',
          water_id: 1,
          light_id: 2,
          plant_image:
            'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_parlor-palmloomscape_charcoal.jpg?ver=279260',
        },
        {
          plant_name: 'Philodendron Heart Leaf',
          species_name: 'Philodendron selloum',
          water_id: 2,
          light_id: 2,
          plant_image:
            'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_philodendron-heartleaf_charcoal.jpg?ver=279047',
        },
        {
          plant_name: 'Ponytail Palm',
          species_name: 'Ponytail Palm',
          water_id: 3,
          light_id: 5,
          plant_image:
            'https://bloomscape.com/wp-content/uploads/2020/04/bloomscape_palm-ponytail_slate_lg-scaled.jpg?ver=439957',
        },
        {
          plant_name: 'Pothos',
          species_name: 'Epipremnum',
          water_id: 3,
          light_id: 3,
          plant_image:
            'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape_pothos_collection_pearls-jade.jpg?ver=278897',
        },
        {
          plant_name: 'Prayer Plant',
          species_name: 'Maranta leuconeur',
          water_id: 1,
          light_id: 4,
          plant_image:
            'https://bloomscape.com/wp-content/uploads/2020/09/bloomscape_neon-prayer-plant_charcoal.jpg?ver=292318',
        },
        {
          plant_name: 'Rubber Tree',
          species_name: 'Ficus Elastica',
          water_id: 1,
          light_id: 2,
          plant_image:
            'https://bloomscape.com/wp-content/uploads/2020/12/bloomscape_burgandy-rubber-tree_stone-resize.jpg?ver=372943',
        },
        {
          plant_name: 'Snake Plant',
          species_name: 'Sansevieria ',
          water_id: 3,
          light_id: 2,
          plant_image:
            'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape-spider-plant_stone.jpg?ver=279117',
        },
        {
          plant_name: 'Spider Plant',
          species_name: 'Chlorophytum comosum',
          water_id: 1,
          light_id: 4,
          plant_image:
            'https://bloomscape.com/wp-content/uploads/2020/08/bloomscape-spider-plant_stone.jpg?ver=279117',
        },
        {
          plant_name: 'Staggered Yucca Cane',
          species_name: 'Yucca elephantipes',
          water_id: 3,
          light_id: 5,
          plant_image:
            'https://bloomscape.com/wp-content/uploads/2021/03/bloomscape_yucca-cane_xl_clay.jpg?ver=437482',
        },
        {
          plant_name: 'Succulent',
          species_name: 'Succulent',
          water_id: 1,
          light_id: 5,
          plant_image:
            'https://bloomscape.com/wp-content/uploads/2020/10/bloomscape_jack-frost_collection_terra-cotta.jpg?ver=313682',
        },
      ]);
    });
};
